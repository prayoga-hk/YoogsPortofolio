import { useEffect } from "react";
import { supabase } from "../lib/supabase";

function TestSupabase() {
  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .limit(1);

      console.log("Data:", data);
      console.log("Error:", error);
    }

    testConnection();
  }, []);

  return <div>Testing Supabase...</div>;
}

export default TestSupabase;
