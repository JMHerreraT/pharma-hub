"use client"

import { Fragment, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { ChevronsUpDown, Check, Plus } from "lucide-react";

type Organization = {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  icon: string;
};

const mockOrganizations: Organization[] = [
  {
    id: "org1",
    name: "Inno Vortex",
    color: "text-white",
    bgColor: "bg-orange-500",
    icon: "IV"
  },
  {
    id: "org2",
    name: "Pixel Forge",
    color: "text-white",
    bgColor: "bg-blue-500",
    icon: "PF"
  },
  {
    id: "org3",
    name: "Code Puzzle",
    color: "text-white",
    bgColor: "bg-green-500",
    icon: "CP"
  },
  {
    id: "org4",
    name: "Cloud Nest",
    color: "text-white",
    bgColor: "bg-purple-500",
    icon: "CN"
  },
  {
    id: "org5",
    name: "Sekar Station",
    color: "text-white",
    bgColor: "bg-slate-800",
    icon: "SS"
  },
  {
    id: "org6",
    name: "Data Flow",
    color: "text-white",
    bgColor: "bg-indigo-500",
    icon: "DF"
  },
  {
    id: "org7",
    name: "Tech Hub",
    color: "text-white",
    bgColor: "bg-pink-500",
    icon: "TH"
  },
  {
    id: "org8",
    name: "Innovation Lab",
    color: "text-white",
    bgColor: "bg-cyan-500",
    icon: "IL"
  },
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
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-border bg-background hover:bg-accent transition-all duration-200 cursor-pointer min-w-0"
          >
            {/* Avatar con color dinámico */}
            <span className={`flex items-center justify-center w-5 h-5 rounded text-xs font-bold flex-shrink-0 ${selected?.bgColor} ${selected?.color}`}>
              {selected?.icon}
            </span>

            {/* Chevron */}
            <ChevronsUpDown className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          </ListboxButton>

          <Transition
            show={menuOpen}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute left-0 z-50 mt-2 w-56 rounded-lg border border-border bg-popover shadow-lg ring-1 ring-black/5 focus:outline-none overflow-hidden">
              {/* Header del dropdown */}
              <div className="px-3 py-2.5 border-b border-border">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Organizations</h3>
              </div>

              {/* Lista con scroll - máximo 5 opciones visibles */}
              <div className="max-h-[240px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20">
                <div className="py-1">
                  {mockOrganizations.map((org) => (
                    <ListboxOption
                      key={org.id}
                      value={org}
                      className={({ active, selected: isSelected }) =>
                        `relative flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-primary/10 text-primary"
                            : active
                            ? "bg-accent"
                            : "text-foreground"
                        }`
                      }
                    >
                      {({ selected: isSelected }) => (
                        <>
                          {/* Icono con color específico */}
                          <span className={`flex items-center justify-center w-6 h-6 rounded text-xs font-bold flex-shrink-0 ${org.bgColor} ${org.color}`}>
                            {org.icon}
                          </span>

                          {/* Nombre de la organización */}
                          <div className="flex-1 min-w-0">
                            <span className="block truncate font-medium text-sm">
                              {org.name}
                            </span>
                          </div>

                          {/* Checkmark para seleccionado */}
                          {isSelected && (
                            <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          )}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </div>
              </div>

              {/* Footer con "New Organizations" */}
              <div className="border-t border-border">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-primary hover:bg-accent transition-colors">
                  <Plus className="w-4 h-4" />
                  New Organizations
                </button>
              </div>
            </ListboxOptions>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};
