<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_subtask()
    {
        $user = User::factory()->create();
        $parent = Task::factory()->create(['user_id' => $user->id]);

        $this->actingAs($user, 'sanctum');
        $response = $this->postJson('/api/tasks', [
            'title' => 'Subtask',
            'parent_id' => $parent->id,
        ]);
        $response->assertStatus(201);
        $this->assertDatabaseHas('tasks', [
            'title' => 'Subtask',
            'parent_id' => $parent->id,
        ]);
    }

    public function test_fetch_task_with_recursive_subtasks()
    {
        $user = User::factory()->create();
        $parent = Task::factory()->create(['user_id' => $user->id]);
        $child = Task::factory()->create(['user_id' => $user->id, 'parent_id' => $parent->id]);
        $grandchild = Task::factory()->create(['user_id' => $user->id, 'parent_id' => $child->id]);

        $this->actingAs($user, 'sanctum');
        $response = $this->getJson("/api/tasks/{$parent->id}");
        $response->assertStatus(200);
        $response->assertJsonFragment(['id' => $child->id]);
        $response->assertJsonFragment(['id' => $grandchild->id]);
    }

    public function test_prevent_task_cycle_on_update()
    {
        $user = User::factory()->create();
        $parent = Task::factory()->create(['user_id' => $user->id]);
        $child = Task::factory()->create(['user_id' => $user->id, 'parent_id' => $parent->id]);

        $this->actingAs($user, 'sanctum');
        // Try to set parent as a child of its own descendant
        $response = $this->putJson("/api/tasks/{$parent->id}", [
            'parent_id' => $child->id,
        ]);
        $response->assertStatus(422);
        $response->assertJsonFragment(['error' => 'A task cannot be assigned as a child of its own descendant.']);
    }

    public function test_prevent_task_being_its_own_parent()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user->id]);

        $this->actingAs($user, 'sanctum');
        $response = $this->putJson("/api/tasks/{$task->id}", [
            'parent_id' => $task->id,
        ]);
        $response->assertStatus(422);
        $response->assertJsonFragment(['error' => 'A task cannot be its own parent.']);
    }
} 