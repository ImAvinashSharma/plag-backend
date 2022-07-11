const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// export const getLocation = async () => {
//   try {
//     const res = await fetch("https://api.db-ip.com/v2/free/self");
//     const { stateProv, ipAddress, error } = await res.json();
//     if (error) throw new Error(error);
//     localStorage.setItem("state", stateProv);
//     localStorage.setItem("ip", ipAddress);
//   } catch (error) {
//     console.error(`error getting location from api.db-ip.com:`, error.message);
//   }
// };

exports.supabase = createClient(supabaseUrl, supabaseAnonKey);
