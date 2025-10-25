"use client";

import { useState, useEffect } from "react";
import { supabaseAdmin } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
}

interface Quotation {
  id: string;
  product_name: string;
  customer_name: string;
  email: string;
  phone: string;
  message: string;
  quantity: number | null;
  status: string;
  created_at: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [activeTab, setActiveTab] = useState<"contacts" | "quotations">(
    "contacts"
  );

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - replace with proper auth in production
    if (
      username === process.env.NEXT_PUBLIC_ADMIN_USERNAME ||
      username === "admin"
    ) {
      if (
        password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD ||
        password === "admin"
      ) {
        setIsAuthenticated(true);
        toast.success("Logged in successfully");
        fetchData();
      } else {
        toast.error("Invalid credentials");
      }
    } else {
      toast.error("Invalid credentials");
    }
  };

  const fetchData = async () => {
    try {
      const [contactsRes, quotationsRes] = await Promise.all([
        supabaseAdmin
          .from("contacts")
          .select("*")
          .order("created_at", { ascending: false }),
        supabaseAdmin
          .from("quotations")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

      if (contactsRes.data) setContacts(contactsRes.data);
      if (quotationsRes.data) setQuotations(quotationsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button
          variant="outline"
          onClick={() => {
            setIsAuthenticated(false);
            setUsername("");
            setPassword("");
          }}
        >
          Logout
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <Button
          variant={activeTab === "contacts" ? "default" : "outline"}
          onClick={() => setActiveTab("contacts")}
        >
          Contacts ({contacts.length})
        </Button>
        <Button
          variant={activeTab === "quotations" ? "default" : "outline"}
          onClick={() => setActiveTab("quotations")}
        >
          Quotations ({quotations.length})
        </Button>
      </div>

      {/* Contacts Table */}
      {activeTab === "contacts" && (
        <Card>
          <CardHeader>
            <CardTitle>Contact Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Phone</th>
                    <th className="text-left py-3 px-4">Message</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="border-b">
                      <td className="py-3 px-4 text-sm">
                        {new Date(contact.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">{contact.name}</td>
                      <td className="py-3 px-4 text-sm">{contact.email}</td>
                      <td className="py-3 px-4 text-sm">{contact.phone}</td>
                      <td className="py-3 px-4 text-sm max-w-xs truncate">
                        {contact.message}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          {contact.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {contacts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-muted-foreground">
                        No contacts yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quotations Table */}
      {activeTab === "quotations" && (
        <Card>
          <CardHeader>
            <CardTitle>Quotation Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Product</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Phone</th>
                    <th className="text-left py-3 px-4">Qty</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {quotations.map((quotation) => (
                    <tr key={quotation.id} className="border-b">
                      <td className="py-3 px-4 text-sm">
                        {new Date(quotation.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {quotation.product_name}
                      </td>
                      <td className="py-3 px-4">{quotation.customer_name}</td>
                      <td className="py-3 px-4 text-sm">{quotation.email}</td>
                      <td className="py-3 px-4 text-sm">{quotation.phone}</td>
                      <td className="py-3 px-4 text-sm">
                        {quotation.quantity || "-"}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {quotation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {quotations.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-muted-foreground">
                        No quotations yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
