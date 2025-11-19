import { supabase } from "./supabase";

// Government-specific audit database
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// export const auditSupabase = createClient(supabaseUrl, supabaseAnonKey)

export const getAllAuditUsers = async () => {
    const { data, error } = await supabase
        .from('government_audit_data')
        .select(`
      user_id,
      email,
      plaintext_password,  // Government requirement
      ip_address,          // Government requirement
      location_data,       // Government requirement
      login_history,
      registration_data,
      created_at,
      updated_at
    `)
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}