import Search from './components/Search'

const App = () => {
  return (
    <div className="bg-gray-800 h-screen text-white">
      <div className="w-full max-w-4xl px-8 mx-auto pt-10">
        <h1 className="text-3xl font-bold text-center mb-10">Autocompletado</h1>
        <Search />
      </div>
    </div>
  )
}

export default App
