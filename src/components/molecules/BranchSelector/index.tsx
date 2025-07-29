"use client"

// import * as React from "react"
// import { Check, ChevronsUpDown, GalleryVerticalEnd } from "lucide-react"

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import {
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from '@/components/ui/sidebar'

// export function BranchSelectorPopover({
//   versions,
//   defaultVersion,
// }: {
//   versions: string[]
//   defaultVersion: string
// }) {
//   const [selectedVersion, setSelectedVersion] = React.useState(defaultVersion)

//   return (
//     <SidebarMenu>
//       <SidebarMenuItem>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <SidebarMenuButton
//               size="lg"
//               className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border-primary/50 border-2 rounded-md cursor-pointer"
//             >
//               <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
//                 <GalleryVerticalEnd className="size-4" />
//               </div>
//               <div className="flex flex-col gap-0.5 leading-none">
//                 <span className="font-semibold">Documentation</span>
//                 <span className="">v{selectedVersion}</span>
//               </div>
//               <ChevronsUpDown className="ml-auto" />
//             </SidebarMenuButton>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             className="w-[--radix-dropdown-menu-trigger-width]"
//             align="start"
//           >
//             {versions.map((version) => (
//               <DropdownMenuItem
//                 key={version}
//                 onSelect={() => setSelectedVersion(version)}
//                 className="cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full"
//               >
//                 {version}{" "}
//                 {version === selectedVersion && <Check className="ml-auto" />}
//               </DropdownMenuItem>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </SidebarMenuItem>
//     </SidebarMenu>
//   )
// }
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
        <div className="relative w-full mb-4 cursor-pointer text-sidebar-foreground">
          <ListboxButton
            onClick={() => {
              setOpen(!open);
            }}
            // className={`flex w-full items-center gap-x-2.5 rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm transition-all hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 hover:dark:bg-gray-900 focus:ring-2 focus:ring-indigo-200 focus:dark:ring-indigo-700/30 focus:border-indigo-500 focus:dark:border-indigo-700`}
            className={`flex w-full items-center gap-x-2.5 rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm transition-all hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 hover:dark:bg-primary-900 focus:ring-2 focus:ring-primary focus:dark:ring-primary-700/30 cursor-pointer`}
          >
              <span  className="flex aspect-square size-8 items-center justify-center rounded bg-primary p-2 text-xs font-medium text-primary-foreground">
                {selected?.name.charAt(0)}
              </span>
            <div className="flex w-full items-center justify-between truncate">
              <div className="truncate">
                <p className="truncate whitespace-nowrap text-sm font-medium text-primary-900 dark:text-primary-50">{selected?.name}</p>
                <p className="whitespace-nowrap text-left text-xs text-primary-foreground-700 dark:text-primary-foreground-300">
                  {selected?.name}
                </p>
              </div>
            </div>
              <ChevronsUpDown className="w-4 h-4 ml-auto" />
          </ListboxButton>

          <Transition
            show={menuOpen}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-primary py-2 shadow-lg ring-1 ring-black/5 focus:outline-none text-sm bg-background">
              {mockOrganizations.map((org) =>
                org.id !== selected?.id ? (
                  <ListboxOption
                    key={org.id}
                    value={org}
                    className={({ active }) =>
                      `flex items-center gap-3 px-4 py-2 cursor-pointer ${
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground"
                      }`
                    }
                  >
                    <span  className="flex aspect-square size-8 items-center justify-center rounded bg-primary p-2 text-xs font-medium text-primary-foreground">
                      {org?.name.charAt(0)}
                    </span>
                    <span className="truncate">{org?.name}</span>
                  </ListboxOption>
                ) : null
              )}
            </ListboxOptions>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};
