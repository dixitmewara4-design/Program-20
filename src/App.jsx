import { useState } from 'react'

const initialEmployees = [
  { id: 1, name: 'Dixit Mewara', role: 'Frontend Developer', department: 'IT', salary: 35000 },
  { id: 2, name: 'Hemant Mewara', role: 'Data Analyst', department: 'Analytics', salary: 42000 },
  { id: 3, name: 'Rahul Mewara', role: 'UI Designer', department: 'Design', salary: 30000 },
]

export default function App() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [form, setForm] = useState({ name: '', role: '', department: '', salary: '' })
  const [editId, setEditId] = useState(null)
  const [search, setSearch] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.role.trim() || !form.department.trim() || Number(form.salary) <= 0) return

    if (editId !== null) {
      setEmployees(current => current.map(emp =>
        emp.id === editId ? { ...emp, ...form, salary: Number(form.salary) } : emp
      ))
      setEditId(null)
    } else {
      setEmployees(current => [...current, {
        ...form, id: Date.now(), salary: Number(form.salary),
      }])
    }
    setForm({ name: '', role: '', department: '', salary: '' })
  }

  function editEmployee(emp) {
    setForm({ name: emp.name, role: emp.role, department: emp.department, salary: String(emp.salary) })
    setEditId(emp.id)
  }

  function deleteEmployee(id) {
    setEmployees(current => current.filter(emp => emp.id !== id))
    if (editId === id) {
      setEditId(null)
      setForm({ name: '', role: '', department: '', salary: '' })
    }
  }

  const filteredEmployees = employees.filter(emp =>
    `${emp.name} ${emp.role} ${emp.department}`.toLowerCase().includes(search.toLowerCase())
  )

  const inputClass = 'w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-cyan-400'

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">Practical 20 · CRUD</p>
            <h1 className="mt-2 text-4xl font-black sm:text-5xl">Employ<span className="text-cyan-400">IQ</span></h1>
            <p className="mt-3 text-slate-400">A smarter way to manage your team.</p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-6 py-4">
            <p className="text-sm text-slate-400">Total Employees</p>
            <p className="text-3xl font-black text-cyan-300">{employees.length}</p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <section className="h-fit rounded-3xl border border-white/10 bg-slate-900 p-6">
            <h2 className="mb-5 text-xl font-bold">{editId !== null ? '✏️ Edit Employee' : '＋ Add Employee'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Full Name</label>
                <input className={inputClass} placeholder="Employee name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Job Role</label>
                <input className={inputClass} placeholder="e.g. Developer" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Department</label>
                <select className={inputClass} value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} required>
                  <option value="">Select department</option>
                  <option>IT</option>
                  <option>Analytics</option>
                  <option>Design</option>
                  <option>Human Resources</option>
                  <option>Finance</option>
                  <option>Marketing</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Monthly Salary (₹)</label>
                <input className={inputClass} type="number" min="1" placeholder="e.g. 35000" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} required />
              </div>
              <button className="w-full rounded-xl bg-cyan-400 px-4 py-3 font-extrabold text-slate-950 transition hover:bg-cyan-300" type="submit">
                {editId !== null ? 'Save Changes' : '+ Add Employee'}
              </button>
              {editId !== null && (
                <button type="button" onClick={() => { setEditId(null); setForm({ name: '', role: '', department: '', salary: '' }) }} className="w-full rounded-xl border border-slate-700 px-4 py-3 font-bold text-slate-300 hover:bg-slate-800">
                  Cancel Edit
                </button>
              )}
            </form>
          </section>

          <section className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-5">
              <div>
                <h2 className="text-xl font-bold">Team Directory</h2>
                <p className="mt-1 text-sm text-slate-400">Create, view, edit and delete records.</p>
              </div>
              <input className={`${inputClass} sm:max-w-64`} placeholder="Search employees..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            {filteredEmployees.length === 0 ? (
              <div className="p-12 text-center text-slate-400">No employees found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-800 text-xs uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="px-5 py-4">Employee</th>
                      <th className="px-5 py-4">Department</th>
                      <th className="px-5 py-4">Salary</th>
                      <th className="px-5 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredEmployees.map(emp => (
                      <tr key={emp.id} className="transition hover:bg-slate-800/60">
                        <td className="px-5 py-4">
                          <p className="font-bold">{emp.name}</p>
                          <p className="mt-1 text-sm text-slate-400">{emp.role}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">{emp.department}</span>
                        </td>
                        <td className="px-5 py-4 font-semibold">₹{emp.salary.toLocaleString('en-IN')}</td>
                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => editEmployee(emp)} className="rounded-lg bg-amber-400/10 px-3 py-2 text-sm font-bold text-amber-300 hover:bg-amber-400/20">Edit</button>
                            <button onClick={() => deleteEmployee(emp.id)} className="rounded-lg bg-red-400/10 px-3 py-2 text-sm font-bold text-red-300 hover:bg-red-500 hover:text-white">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="border-t border-white/10 px-5 py-4 text-sm text-slate-500">
              Showing {filteredEmployees.length} of {employees.length} employees
            </div>
          </section>
        </div>
        <footer className="mt-8 text-center text-sm text-slate-500">EmployIQ · Employee Management System</footer>
      </div>
    </main>
  )
}