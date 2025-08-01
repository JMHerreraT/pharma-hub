"use client"

import { Fragment, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { ChevronsUpDown } from "lucide-react";

type Organization = {
  id: string;
  name: string;
};

const mockOrganizations: Organization[] = [
  { id: "org1", name: "MediHub Peru" },
  { id: "org2", name: "Clinica Internacional" },
  { id: "org3", name: "Sanitas Group" },
  { id: "org4", name: "Sanitas Group" },
  { id: "org5", name: "Sanitas Group" },
  { id: "org6", name: "Sanitas Group" },
  { id: "org7", name: "Sanitas Group" },
  { id: "org8", name: "Sanitas Group" },
  { id: "org9", name: "Sanitas Group" },
  { id: "org10", name: "Sanitas Group" },
  { id: "org11", name: "Sanitas Group" },
];

export const BranchSelectorPopover = () => {
  const [selected, setSelected] = useState<Organization>(mockOrganizations[0]);
  const [open, setOpen] = useState(false);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open: menuOpen }) => (
        <div className="relative">
          <ListboxButton
            onClick={() => {
              setOpen(!open);
            }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer min-w-0"
          >
            {/* Avatar más pequeño */}
            <span className="flex items-center justify-center w-6 h-6 rounded bg-orange-500 dark:bg-orange-400 text-xs font-medium text-white flex-shrink-0">
              {selected?.name.charAt(0)}
            </span>

            {/* Chevron */}
            <ChevronsUpDown className="w-3 h-3 text-gray-400 dark:text-gray-500 flex-shrink-0" />
          </ListboxButton>

          <Transition
            show={menuOpen}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute right-0 z-50 mt-2 w-56 overflow-auto rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none">
              {/* Header del dropdown */}
              <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Organizations</p>
              </div>

              {mockOrganizations.map((org) => (
                <ListboxOption
                  key={org.id}
                  value={org}
                  className={({ active, selected: isSelected }) =>
                    `flex items-center gap-3 px-3 py-2 cursor-pointer text-sm ${
                      active
                        ? "bg-gray-50 dark:bg-gray-700"
                        : ""
                    } ${isSelected ? "bg-teal-50 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300" : "text-gray-700 dark:text-gray-300"}`
                  }
                >
                  {({ selected: isSelected }) => (
                    <>
                      <span className="flex items-center justify-center w-6 h-6 rounded bg-orange-500 dark:bg-orange-400 text-xs font-medium text-white flex-shrink-0">
                        {org?.name.charAt(0)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="block truncate font-medium">{org?.name}</span>
                        <span className="block truncate text-xs text-gray-500 dark:text-gray-400">{org?.name}</span>
                      </div>
                      {isSelected && (
                        <svg className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </>
                  )}
                </ListboxOption>
              ))}

              {/* Footer con "New Organizations" */}
              <div className="border-t border-gray-100 dark:border-gray-700 mt-1">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-teal-600 dark:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  New Organization
                </button>
              </div>
            </ListboxOptions>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};
