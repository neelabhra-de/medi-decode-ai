import api from "./apiClient";

const wait = (ms = 600) => new Promise((r) => setTimeout(r, ms));

const fallback = {
  auth: { token: "mock-jwt", user: { id: "1", name: "Alex Mercer", email: "alex@medidecode.ai" } },
  report: { summary: "Mild LDL elevation detected." },
  medicine: { medicineName: "Amoxicillin 500mg", dosage: "1 capsule every 8 hours" },
};

const unwrap = (payload) => payload?.data ?? payload;

export const authService = {
  login: async (payload) => {
    try {
      const { data } = await api.post("/auth/login", payload);
      return unwrap(data);
    } catch {
      await wait();
      return fallback.auth;
    }
  },
  signup: async (payload) => {
    try {
      const { data } = await api.post("/auth/signup", payload);
      return unwrap(data);
    } catch {
      await wait();
      return fallback.auth;
    }
  },
};

export const uploadService = {
  report: async (file) => {
    try {
      const fd = new FormData();
      if (file) fd.append("file", file);
      const { data } = await api.post("/reports/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
      const out = unwrap(data);
      return out?.ai?.data || out;
    } catch {
      await wait(1200);
      return fallback.report;
    }
  },
  medicine: async (file) => {
    try {
      const fd = new FormData();
      if (file) fd.append("file", file);
      const { data } = await api.post("/medicines/scan", fd, { headers: { "Content-Type": "multipart/form-data" } });
      const out = unwrap(data);
      return out?.ai?.data || out;
    } catch {
      await wait(1100);
      return fallback.medicine;
    }
  },
};

export const historyService = {
  reports: async () => {
    try {
      const { data } = await api.get("/reports/history");
      return unwrap(data);
    } catch {
      await wait();
      return [{ id: 1, fileName: "Blood Test Oct 24", summary: "LDL mildly elevated" }];
    }
  },
  medicines: async () => {
    try {
      const { data } = await api.get("/medicines/history");
      return unwrap(data);
    } catch {
      await wait();
      return [{ id: 1, medicineName: "Amoxicillin" }];
    }
  },
};

export const chatService = {
  askReport: async (message, reportId) => {
    try {
      const { data } = await api.post("/chat/report-chat", { reportId, question: message });
      const out = unwrap(data);
      return { reply: out?.answer || "No response" };
    } catch {
      await wait(700);
      return { reply: "LDL is mildly elevated. Focus on diet and exercise and review with your doctor." };
    }
  },
};
