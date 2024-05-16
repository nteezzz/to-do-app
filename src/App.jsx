import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { AllTasks } from './pages/AllTasks/allTasks'
import { CompletedTasks } from './pages/CompletedTasks/completedTasks'

import './App.css'
import { TodaysTasks } from './pages/TodaysTasks/todaysTasks'

function App() {


return (
<>
  <Tabs defaultValue="all" className="w-full">
    <TabsList>
      <TabsTrigger value="today">Today's Tasks</TabsTrigger>
      <TabsTrigger value="all">All Tasks</TabsTrigger>
      <TabsTrigger value="completed">Completed Tasks</TabsTrigger>
    </TabsList>
    <TabsContent value="today">
      <TodaysTasks/>
    </TabsContent>
    <TabsContent value="all">
      <AllTasks />
    </TabsContent>
    <TabsContent value="completed">
      <CompletedTasks/>
    </TabsContent>
  </Tabs>


</>
)
}

export default App