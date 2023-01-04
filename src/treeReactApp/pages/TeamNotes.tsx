import path from 'path';

import { Team } from '@hackmd/api/dist/type';
import { useEffect, useMemo, useState } from 'react';
import { TreeItem } from 'react-vsc-treeview';
import useSWR from 'swr';

import { API } from '../../api';
import { useAppContext } from '../AppContainer';
import { ErrorListItem } from '../components/ErrorListItem';
import { NoteTreeItem } from '../components/NoteTreeItem';
import { refreshTeamNotesEvent, useEventEmitter } from '../events';
import { useTeamNotesStore } from '../store';

const TeamTreeItem = ({ team }: { team: Team }) => {
  const { data: notes = [], mutate } = useSWR(
    () => (team ? `/teams/${team.id}/notes` : null),
    () => API.getTeamNotes(team.path)
  );

  const { extensionPath } = useAppContext();
  const iconPath = useMemo(() => {
    if (extensionPath) {
      return {
        light: path.join(extensionPath, 'images/icon/light/users.svg'),
        dark: path.join(extensionPath, 'images/icon/dark/users.svg'),
      };
    } else {
      return undefined;
    }
  }, [extensionPath]);

  useEventEmitter(refreshTeamNotesEvent, () => {
    mutate();
  });

  return (
    <TreeItem label={team.name} expanded iconPath={iconPath} description={team.path}>
      {notes.map((note) => {
        return <NoteTreeItem key={note.id} note={note} />;
      })}

      {notes.length === 0 && <TreeItem label="No notes" />}
    </TreeItem>
  );
};

export const TeamNotes = () => {
  const { data: teams = [], mutate, error } = useSWR('/teams', () => API.getTeams());
  const [selectedTeamId, setSelectedTeamId] = useState(useTeamNotesStore.getState().selectedTeamId);

  // I'm not sure why using useTeamNotesStore doesn't trigger re-render
  // So we use useEffect to subscribe to the zustand store and update the useState we use in the component
  useEffect(() => {
    useTeamNotesStore.subscribe((state) => setSelectedTeamId(state.selectedTeamId));
  }, []);

  const selectedTeam = useMemo(() => teams.find((t) => t.id === selectedTeamId), [teams, selectedTeamId]);

  useEventEmitter(refreshTeamNotesEvent, () => {
    mutate();
  });

  return (
    <>
      <ErrorListItem error={error} />

      {!error && (
        <TreeItem
          label="Click to select a team"
          command={{
            title: 'Select a team',
            command: 'selectTeam',
          }}
        />
      )}

      {!error && selectedTeam && <TeamTreeItem team={selectedTeam} />}
    </>
  );
};