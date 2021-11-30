import { useMemo, useRef, useState } from 'react'
import { createAutocomplete } from '@algolia/autocomplete-core'

import AutocompleItem from './AutocompleItem'

const Search = () => {
  const formRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  const [state, setstate] = useState({
    isOpen: false,
    collections: []
  })

  const autocomplete = useMemo(() => {
    return createAutocomplete({
      debug: true,
      placeholder: 'Busca tu pais',
      onStateChange: ({ state }) => setstate(state),
      getSources: () => [
        {
          sourceId: 'countries-API',
          getItems: ({ query }) => {
            if (!!query) {
              const url = `https://restcountries.com/v3.1/name/${query}`
              return fetch(url)
                .then((res) => res.json())
                .catch((err) => console.log(err))
            }
          }
        }
      ]
    })
  }, [])

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current
  })

  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current
  })

  return (
    <form ref={formRef} className="flex justify-center mb-20" {...formProps}>
      <div className="flex relative p-1 bg-gradient-to-tr from-purple-600 to-blue-300 rounded-full w-full">
        <input
          ref={inputRef}
          type="text"
          className="flex-1 p-2 pl-4 rounded-full outline-none text-black w-full font-serif"
          {...inputProps}
        />

        {state.isOpen && (
          <div
            ref={panelRef}
            className=" max-h-96 overflow-auto absolute top-0 left-0 mt-14 border border-gray-100 bg-white rounded-lg shadow-lg z-10 w-full"
            {...autocomplete.getPanelProps()}
          >
            {state.collections.map((collection, i) => {
              const { items } = collection

              return (
                <section key={`section-${i}`}>
                  {items.length > 0 && (
                    <ul {...autocomplete.getListProps()}>
                      {items.map((item) => (
                        <AutocompleItem key={item.ccn3} {...item} />
                      ))}
                    </ul>
                  )}
                </section>
              )
            })}
          </div>
        )}
      </div>
    </form>
  )
}

export default Search
