import { ChartOverview } from './_components/chart'
import { Client } from './_components/client'
import { Sales } from './_components/sales'

export default function Dashboard() {
  return (
    <main>
      <Sales />

      <section className="mt-4 flex flex-col md:flex-row gap-4">
        <ChartOverview />
        <Client />
      </section>
    </main>
  )
}
