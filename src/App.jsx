import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { AllTasks } from './pages/AllTasks/allTasks'

import './App.css'

function App() {


return (
<>
  <Tabs defaultValue="all" className="w-full">
    <TabsList>
      <TabsTrigger value="today">Today's</TabsTrigger>
      <TabsTrigger value="all">All</TabsTrigger>
      <TabsTrigger value="completed">Completed</TabsTrigger>
    </TabsList>
    <TabsContent value="today">Today's task will be displayed here</TabsContent>
    <TabsContent value="all">
      <AllTasks />
    </TabsContent>
    <TabsContent value="completed">Completed tasks will be displayed here</TabsContent>
  </Tabs>


</>
)
}

export default App