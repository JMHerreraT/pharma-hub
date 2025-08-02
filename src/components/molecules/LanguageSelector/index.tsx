"use client"

import React, { useState } from 'react'
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDown, Globe } from 'lucide-react'

interface Language {
  id: string
  name: string
  code: string
  flag: string
}

const languages: Language[] = [
  { id: '1', name: 'English', code: 'en', flag: '🇺🇸' },
  { id: '2', name: 'Español', code: 'es', flag: '🇪🇸' },
  { id: '3', name: 'Français', code: 'fr', flag: '🇫🇷' },
  { id: '4', name: 'Deutsch', code: 'de', flag: '🇩🇪' },
]

export function LanguageSelector() {
  const [selected, setSelected] = useState<Language>(languages[0])

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button className="relative flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
          <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
            {selected.code.toUpperCase()}
          </span>
          <ChevronDown className="h-3 w-3 text-gray-400 dark:text-gray-500" />
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute right-0 z-50 mt-2 w-48 overflow-auto rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none">
            {/* Header */}
            <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Idiomas
              </p>
            </div>

            {languages.map((language) => (
              <Listbox.Option
                key={language.id}
                value={language}
                className={({ active, selected: isSelected }) =>
                  `relative cursor-default select-none px-3 py-2 ${
                    active
                      ? 'bg-gray-50 dark:bg-gray-700'
                      : ''
                  } ${
                    isSelected
                      ? 'bg-teal-50 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300'
                      : 'text-gray-700 dark:text-gray-300'
                  }`
                }
              >
                {({ selected: isSelected }) => (
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{language.flag}</span>
                    <div className="flex-1">
                      <span className={`block text-sm ${isSelected ? 'font-medium' : 'font-normal'}`}>
                        {language.name}
                      </span>
                    </div>
                    {isSelected && (
                      <svg
                        className="h-4 w-4 text-teal-600 dark:text-teal-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
