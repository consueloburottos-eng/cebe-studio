"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { useSiteTheme } from "@/hooks/useSiteTheme";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import ModeSwitcher from "@/components/ModeSwitcher";
import BookModal from "@/components/branding/BookModal";
import MenuBar from "./MenuBar";
import DesktopWidgets from "./DesktopWidgets";
import Dock, { SaasWindow } from "./Dock";
import ProjectsWindow from "./ProjectsWindow";
import NotesWindow, { NoteId } from "./NotesWindow";

export default function SaasDesktop() {
  const [dark, setDark] = useSiteTheme();
  const [lang, setLang] = useSiteLanguage();
  const [win, setWin] = useState<SaasWindow>(null);
  const [note, setNote] = useState<NoteId>("about");
  const [bookOpen, setBookOpen] = useState(false);
  const [projectSlug, setProjectSlug] = useState<string | null>(null);

  function openAbout(n: NoteId = "about") {
    setNote(n);
    setWin("about");
  }

  function openProject(slug: string) {
    setProjectSlug(slug);
    setWin("projects");
  }

  function openProjects() {
    setProjectSlug(null);
    setWin("projects");
  }

  function downloadCV() {
    const link = document.createElement("a");
    link.href = "/profile/cv.pdf";
    link.download = "";
    link.click();
  }

  return (
    <div
      data-os-theme={dark ? "dark" : "light"}
      className="flex h-dvh w-full flex-col overflow-clip"
      style={{ background: "var(--os-bg)" }}
    >
      <ModeSwitcher
        mode="saas"
        variant={dark ? "dark" : "light"}
        dark={dark}
        onSetLight={() => setDark(false)}
        onSetDark={() => setDark(true)}
        lang={lang}
        onSetLang={setLang}
      />

      <div className="relative flex-1 overflow-clip font-sans" style={{ color: "var(--os-tx)" }}>
        <div
          className="pointer-events-none absolute -top-[140px] -right-[90px] h-[560px] w-[560px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(110,124,255,.16),transparent 68%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-[180px] left-[16%] h-[520px] w-[520px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(150,90,120,.09),transparent 70%)" }}
        />
        <MenuBar
          onOverview={() => setWin(null)}
          onProjects={openProjects}
          onSkills={() => openAbout("about")}
          onContact={() => openAbout("contacto")}
        />
        <DesktopWidgets onBookCall={() => setBookOpen(true)} onOpenProject={openProject} />
        <Dock
          active={win}
          onHome={() => setWin(null)}
          onProjects={openProjects}
          onAbout={() => openAbout("about")}
          onCV={downloadCV}
          onContacto={() => openAbout("contacto")}
        />

        {win === "projects" && (
          <ProjectsWindow
            projects={projects}
            onClose={() => {
              setWin(null);
              setProjectSlug(null);
            }}
            initialSlug={projectSlug}
          />
        )}
        {win === "about" && (
          <NotesWindow
            note={note}
            onNoteChange={setNote}
            onClose={() => setWin(null)}
          />
        )}
        {bookOpen && <BookModal onClose={() => setBookOpen(false)} />}
      </div>
    </div>
  );
}
