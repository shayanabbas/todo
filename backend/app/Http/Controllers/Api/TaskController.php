<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Task::where('user_id', Auth::id());

        // Optional: filter by label, priority, or parent_id
        if ($request->has('labels')) {
            $query->whereJsonContains('labels', $request->labels);
        }
        if ($request->has('priority')) {
            $query->where('priority', $request->priority);
        }
        if ($request->has('parent_id')) {
            $query->where('parent_id', $request->parent_id);
        }

        // Optionally eager load children for hierarchy
        $tasks = $query->get();

        return response()->json($tasks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'nullable|in:high,medium,low',
            'labels' => 'nullable|array',
            'labels.*' => 'string|max:255',
            'parent_id' => 'nullable|exists:tasks,id',
            'completed' => 'nullable|boolean',
        ]);

        // Ensure parent_id (if provided) belongs to the user
        if (isset($validated['parent_id'])) {
            $parent = Task::where('id', $validated['parent_id'])
                ->where('user_id', Auth::id())
                ->first();
            if (!$parent) {
                return response()->json(['error' => 'Invalid parent task.'], 422);
            }
        }

        // Prevent cycles: a task cannot be its own ancestor
        // (Not needed on store, as the task does not exist yet)

        $task = Task::create([
            'user_id' => Auth::id(),
            'parent_id' => $validated['parent_id'] ?? null,
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'priority' => $validated['priority'] ?? 'medium',
            'labels' => $validated['labels'] ?? [],
            'completed' => $validated['completed'] ?? false,
        ]);

        return response()->json($task, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        if ($task->user_id !== Auth::id()) {
            return response()->json(['error' => 'Not authorized.'], 403);
        }

        // Load all recursive children (subtasks tree)
        $task->load('childrenRecursive');

        return response()->json($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        if ($task->user_id !== Auth::id()) {
            return response()->json(['error' => 'Not authorized.'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'nullable|in:high,medium,low',
            'labels' => 'nullable|array',
            'labels.*' => 'string|max:255',
            'parent_id' => 'nullable|exists:tasks,id',
            'completed' => 'nullable|boolean',
        ]);

        // Ensure parent_id (if provided) belongs to the user
        if (isset($validated['parent_id'])) {
            $parent = Task::where('id', $validated['parent_id'])
                ->where('user_id', Auth::id())
                ->first();
            if (!$parent) {
                return response()->json(['error' => 'Invalid parent task.'], 422);
            }
            // Prevent cycles: a task cannot be its own ancestor or descendant
            if ($validated['parent_id'] == $task->id) {
                return response()->json(['error' => 'A task cannot be its own parent.'], 422);
            }
            // Check if the new parent is a descendant of this task (which would create a cycle)
            $descendantIds = $this->getAllDescendantIds($task);
            if (in_array($validated['parent_id'], $descendantIds)) {
                return response()->json(['error' => 'A task cannot be assigned as a child of its own descendant.'], 422);
            }
        }

        $task->update($validated);

        return response()->json($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        if ($task->user_id !== Auth::id()) {
            return response()->json(['error' => 'Not authorized.'], 403);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted.']);
    }

    // Fetch the full task tree for the authenticated user
    public function tasksTree()
    {
        $tasks = Task::where('user_id', Auth::id())
            ->whereNull('parent_id')
            ->with(['childrenRecursive'])
            ->get();

        return response()->json($tasks);
    }

    /**
     * Helper to get all descendant IDs of a task recursively
     */
    private function getAllDescendantIds(Task $task)
    {
        $ids = [];
        foreach ($task->children as $child) {
            $ids[] = $child->id;
            $ids = array_merge($ids, $this->getAllDescendantIds($child));
        }
        return $ids;
    }
}
