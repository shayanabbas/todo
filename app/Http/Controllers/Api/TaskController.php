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
        if ($request->has('label')) {
            $query->where('label', $request->label);
        }
        if ($request->has('priority')) {
            $query->where('priority', $request->priority);
        }
        if ($request->has('parent_id')) {
            $query->where('parent_id', $request->parent_id);
        }

        // Optionally eager load children for hierarchy
        $tasks = $query->with('children')->get();

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
            'label' => 'nullable|string|max:255',
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

        $task = Task::create([
            'user_id' => Auth::id(),
            'parent_id' => $validated['parent_id'] ?? null,
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'priority' => $validated['priority'] ?? 'medium',
            'label' => $validated['label'] ?? null,
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

        // Optionally load children
        $task->load('children');

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
            'label' => 'nullable|string|max:255',
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
}
