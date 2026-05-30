import { supabase } from '@/lib/supabase/client';

export const EnvironmentService = {
  async getProjectEnvironment(projectId: string) {
    const { data, error } = await supabase
      .from('environments')
      .select(`*, lighting_profiles(*), projects(*)`)
      .eq('project_id', projectId)
      .single(); 
    
    if (error) throw error;
    return data;
  },

  async persistAtmosphericState(environmentId: string, snapshot: any) {
    const { error } = await supabase
      .from('environments')
      .update({ snapshot })
      .eq('id', environmentId);
      
    if (error) throw error;
    return true;
  }
};