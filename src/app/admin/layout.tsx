import React from "react";
import { AdminNavbar } from "../../components/AdminNavBar/AdminNavBar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div>
      <AdminNavbar />
      <div style={{ maxWidth: "1200px", margin: "auto" }}>{children}</div>
    </div>
  );
};

export default AdminLayout;
