export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      cabinets: {
        Row: {
          alternative_driver_size: number | null;
          brand: string;
          created_at: string;
          depth_mm: number | null;
          description: string;
          directivity_horizontal: number | null;
          directivity_vertical: number | null;
          driver_size: number | null;
          drivers_amount: number | null;
          frequency_end: number | null;
          frequency_start: number | null;
          height_mm: number | null;
          id: string;
          images: Json;
          max_spl: number[];
          model: string;
          sensitivity: number[];
          sensitivity_measurement_settings: string | null;
          short_description: string;
          type: string | null;
          weight_kg: number | null;
          width_mm: number | null;
          wood_thickness_mm: number | null;
        };
        Insert: {
          alternative_driver_size?: number | null;
          brand?: string;
          created_at?: string;
          depth_mm?: number | null;
          description?: string;
          directivity_horizontal?: number | null;
          directivity_vertical?: number | null;
          driver_size?: number | null;
          drivers_amount?: number | null;
          frequency_end?: number | null;
          frequency_start?: number | null;
          height_mm?: number | null;
          id?: string;
          images?: Json;
          max_spl?: number[];
          model?: string;
          sensitivity?: number[];
          sensitivity_measurement_settings?: string | null;
          short_description?: string;
          type?: string | null;
          weight_kg?: number | null;
          width_mm?: number | null;
          wood_thickness_mm?: number | null;
        };
        Update: {
          alternative_driver_size?: number | null;
          brand?: string;
          created_at?: string;
          depth_mm?: number | null;
          description?: string;
          directivity_horizontal?: number | null;
          directivity_vertical?: number | null;
          driver_size?: number | null;
          drivers_amount?: number | null;
          frequency_end?: number | null;
          frequency_start?: number | null;
          height_mm?: number | null;
          id?: string;
          images?: Json;
          max_spl?: number[];
          model?: string;
          sensitivity?: number[];
          sensitivity_measurement_settings?: string | null;
          short_description?: string;
          type?: string | null;
          weight_kg?: number | null;
          width_mm?: number | null;
          wood_thickness_mm?: number | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          created_at: string;
          id: string;
          role: Database['public']['Enums']['role'] | null;
        };
        Insert: {
          created_at?: string;
          id: string;
          role?: Database['public']['Enums']['role'] | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database['public']['Enums']['role'] | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_users_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      role: 'guest' | 'admin';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
      Database['public']['Views'])
  ? (Database['public']['Tables'] &
      Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
  ? Database['public']['Enums'][PublicEnumNameOrOptions]
  : never;
