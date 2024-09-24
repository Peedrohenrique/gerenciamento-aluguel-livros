import { fetchAllDashboard } from '@/services/dashboard'
import { ChartOverview } from './_components/chart'
import { Client } from './_components/client'
import { Sales } from './_components/sales'

export default async function Dashboard() {
  const data = await fetchAllDashboard()

  return (
    <main>
      <Sales data={data} />

      <section className="mt-4 flex flex-col md:flex-row gap-4">
        <ChartOverview />
        <Client />
      </section>
    </main>
  )
}
