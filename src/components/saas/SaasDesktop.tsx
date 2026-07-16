"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import ModeSwitcher from "@/components/ModeSwitcher";
import BookModal from "@/components/branding/BookModal";
import MenuBar from "./MenuBar";
import DesktopWidgets from "./DesktopWidgets";
import DesktopIcons from "./DesktopIcons";
import Dock, { SaasWindow } from "./Dock";
import ProjectsWindow from "./ProjectsWindow";
import NotesWindow, { NoteId } from "./NotesWindow";

export default function SaasDesktop() {
  const [win, setWin] = useState<SaasWindow>(null);
  const [note, setNote] = useState<NoteId>("about");
  const [bookOpen, setBookOpen] = useState(false);

  function openAbout(n: NoteId = "about") {
    setNote(n);
    setWin("about");
  }

  return (
    <div className="flex h-dvh w-full flex-col overflow-clip" style={{ background: "var(--os-bg)" }}>
      <ModeSwitcher mode="saas" variant="dark" />

      <div className="relative flex-1 overflow-clip font-sans" style={{ color: "var(--os-tx)" }}>
        <div
          className="pointer-events-none absolute -top-[140px] -right-[90px] h-[560px] w-[560px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(110,124,255,.16),transparent 68%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-[180px] left-[16%] h-[520px] w-[520px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(150,90,120,.09),transparent 70%)" }}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span
            className="font-display font-extrabold tracking-[-0.04em] whitespace-nowrap"
            style={{ fontSize: "clamp(80px,15vw,240px)", color: "rgba(245,245,247,.028)" }}
          >
            CEBE:STUDIO
          </span>
        </div>

        <MenuBar />
        <DesktopWidgets onBookCall={() => setBookOpen(true)} />
        <DesktopIcons onOpenCV={() => openAbout("about")} onOpenProjects={() => setWin("projects")} />
        <Dock
          active={win}
          onHome={() => setWin(null)}
          onProjects={() => setWin("projects")}
          onAbout={() => openAbout("about")}
          onCV={() => openAbout("about")}
          onContacto={() => openAbout("contacto")}
        />

        {win === "projects" && (
          <ProjectsWindow projects={projects} onClose={() => setWin(null)} />
        )}
        {win === "about" && (
          <NotesWindow
            projects={projects}
            note={note}
            onNoteChange={setNote}
            onClose={() => setWin(null)}
            onOpenBook={() => setBookOpen(true)}
          />
        )}
        {bookOpen && <BookModal onClose={() => setBookOpen(false)} />}
      </div>
    </div>
  );
}
