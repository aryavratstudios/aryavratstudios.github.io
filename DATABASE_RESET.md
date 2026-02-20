# Database Reset & Schema Update

To ensure the new Role-Based Access Control (RBAC) and Review System are fully functional, follow these steps to reset/update your Supabase database.

> [!CAUTION]
> This process involves running a script that might conflict with existing data if not handled carefully. It is recommended to use the SQL Editor in the Supabase Dashboard.

## Steps to Update Schema

1. **Open Supabase Dashboard**: Go to your project and navigate to the **SQL Editor**.
2. **Copy Schema**: Open the local [schema.sql](file:///c:/Users/hp/Desktop/Portfolio/supabase/schema.sql) and copy its entire content.
3. **Run SQL**: Paste the content into a new query in the SQL Editor and click **Run**.
    - *Note: This will update table structures, re-create the `handle_new_user` function, and re-apply triggers.*
4. **Verify Tables**: Ensure the following new tables are present:
    - `reviews`
    - `review_tokens`
    - `audit_logs` (if not already there)

## Verifying RBAC Reset
The `handle_new_user` function has been updated to include the following whitelists:
- **Admins (Email)**: `karn.abhinv00@gmail.com`, `abhinavytagain666@gmail.com`
- **Admins (Discord)**: `1170217016360185926`, `1438917770233254049`, `1310836134305071106`
- **Manager**: `649083072192446484`

To test, you can sign up with one of these accounts and check the `profiles` table for the assigned `role`.

## Testing Review Links
1. Use the Discord bot command `/generate-review-link project_id:YOUR_PROJECT_ID`.
2. Access the generated URL (e.g., `http://localhost:3000/dashboard/reviews/TOKEN`).
3. Submit a review and check the `/reviews` page on the website.
