// File: core/memory/supabase.ts

export class SupabaseMemory {
  async getLatestInput(): Promise<any> {
    return { text: "Client email: Can we reschedule our 2pm?" };
  }

  async saveMemory(_data: any): Promise<void> {
    // Placeholder
  }
}
