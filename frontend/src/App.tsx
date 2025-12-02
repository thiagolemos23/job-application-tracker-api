import { useEffect, useState } from "react";
import type { FormEvent } from "react";

type Application = {
  id: string;
  company: string;
  position: string;
  status: string;
  source: string;
  appliedAt: string;
  notes: string | null;
};

const API_BASE_URL = "http://localhost:3000";

const STATUS_OPTIONS = ["aplicado", "teste", "entrevista", "oferta", "rejeitado"];

function App() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("aplicado");
  const [source, setSource] = useState("");
  const [notes, setNotes] = useState("");

  async function loadApplications() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/applications`);

      if (!res.ok) {
        throw new Error(`Erro ao buscar candidaturas (${res.status})`);
      }

      const data: Application[] = await res.json();
      setApplications(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Erro inesperado ao carregar candidaturas");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateApplication(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!company.trim() || !position.trim() || !source.trim()) {
      setError("Preencha pelo menos empresa, cargo e origem.");
      return;
    }

    try {
      setError(null);

      const res = await fetch(`${API_BASE_URL}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: company.trim(),
          position: position.trim(),
          status,
          source: source.trim(),
          notes: notes.trim() || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error(`Erro ao criar candidatura (${res.status})`);
      }

      setCompany("");
      setPosition("");
      setStatus("aplicado");
      setSource("");
      setNotes("");

      await loadApplications();
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Erro inesperado ao criar candidatura");
    }
  }

  async function handleDeleteApplication(id: string) {
    const sure = window.confirm(
      "Tem certeza que deseja excluir essa candidatura?"
    );
    if (!sure) return;

    try {
      setError(null);

      const res = await fetch(`${API_BASE_URL}/applications/${id}`, {
        method: "DELETE",
      });

      if (!res.ok && res.status !== 204) {
        throw new Error(`Erro ao deletar candidatura (${res.status})`);
      }

      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Erro inesperado ao deletar candidatura");
    }
  }

  async function handleUpdateStatus(id: string, newStatus: string) {
    const previous = applications;

    // atualização otimista
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );

    try {
      setError(null);

      const res = await fetch(`${API_BASE_URL}/applications/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error(`Erro ao atualizar status (${res.status})`);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Erro inesperado ao atualizar status");

      // volta pro estado anterior se der erro
      setApplications(previous);
    }
  }

  useEffect(() => {
    loadApplications();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Job Application Tracker</h1>
        <p>Interface para visualizar e acompanhar suas candidaturas.</p>

        <button onClick={loadApplications} disabled={loading}>
          {loading ? "Carregando..." : "Recarregar lista"}
        </button>
      </header>

      {error && <div className="app-error">{error}</div>}

      <section className="app-form-section">
        <h2>Nova candidatura</h2>
        <form className="app-form" onSubmit={handleCreateApplication}>
          <div className="form-row">
            <div className="form-field">
              <label>Empresa</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Ex: Empresa X"
              />
            </div>

            <div className="form-field">
              <label>Cargo</label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Ex: Dev Jr Backend"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>Origem</label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="Ex: linkedin, gupy, indicação..."
              />
            </div>
          </div>

          <div className="form-field">
            <label>Notas</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Prazo de resposta, etapas, observações..."
            />
          </div>

          <div className="form-actions">
            <button type="submit">Salvar candidatura</button>
          </div>
        </form>
      </section>

      <main>
        {applications.length === 0 && !loading ? (
          <p>Nenhuma candidatura cadastrada ainda.</p>
        ) : (
          <table className="app-table">
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Cargo</th>
                <th>Status</th>
                <th>Origem</th>
                <th>Data</th>
                <th>Notas</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.company}</td>
                  <td>{app.position}</td>
                  <td>
                    <select
                      value={app.status}
                      onChange={(e) =>
                        handleUpdateStatus(app.id, e.target.value)
                      }
                      className="table-select"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{app.source}</td>
                  <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                  <td>{app.notes || "-"}</td>
                  <td>
                    <button
                      type="button"
                      className="table-btn table-btn-danger"
                      onClick={() => handleDeleteApplication(app.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default App;
