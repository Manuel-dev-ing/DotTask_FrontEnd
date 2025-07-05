import type { Task } from "@/types/index";
import AddNoteForm from "./AddNoteForm";
import NoteDetail from "./NoteDetail";
import { MessageSquare } from "lucide-react";

type NotesPanelProps = {
  notes: Task['notas']
}

export default function NotesPanel({ notes } : NotesPanelProps) {
  return (
    <>
        <AddNoteForm />
        
        <div className="border border-gray-300 rounded-md mt-6 p-5">
            {notes.length ? (
              <>
                <p className="font-semibold text-xl text-black flex items-center gap-2"><MessageSquare /> Notas{' '}({notes.length})</p>
                {notes.map( note => <NoteDetail key={note.id} note={note} /> )}

              </>
            
            ): <p className="text-gray-500 text-center pt-3">No hay notas</p>}


        </div>

    </>
  )
}
