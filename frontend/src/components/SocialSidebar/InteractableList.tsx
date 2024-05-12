import useTownController from '../../hooks/useTownController';
import React, { useEffect, useState } from 'react';
import ConversationAreaController from '../../classes/ConversationAreaController';
import ViewingAreaController from '../../classes/ViewingAreaController';

/**
 * React hook for getting all ConversationAreas in a TownController.
 *
 * @returns List of all ConversationAreas from the TownController.
 */
export default function useAllConversationAreas(): ConversationAreaController[] {
  const currTownController = useTownController();
  const allConversationAreas = currTownController.conversationAreas;
  return allConversationAreas;
}

/**
 * React hook for getting all ViewingAreas in a TownController.
 *
 * @returns List of all ViewingAreas from the TownController.
 */
export function useAllViewingAreas(): ViewingAreaController[] {
  const currTownController = useTownController();
  const allViewingAreas = currTownController.viewingAreas;
  return allViewingAreas;
}

/**
 * React component representing a list of the Interactables in the town.
 * Lists only the ids of the Interactables.
 * Clicking on an Interactable's id removes the Interactable from the town, and also from the list.
 *
 * @returns Component for list of Interactables in the town.
 */
export function InteractableList() {
  const currTownController = useTownController();
  const [allConversationAreas, setAllConversationAreas] = useState(
    currTownController.conversationAreas,
  );
  const [allViewingAreas, setAllViewingAreas] = useState(currTownController.viewingAreas);

  useEffect(() => {
    const changeConversationArea = (argument: ConversationAreaController[]) => {
      if (argument != undefined) {
        setAllConversationAreas(argument);
      }
    };
    const changeViewingArea = (argument: ViewingAreaController[]) => {
      if (argument != undefined) {
        setAllViewingAreas(argument);
      }
    };

    currTownController.addListener('conversationAreasChanged', changeConversationArea);
    currTownController.addListener('viewingAreasChanged', changeViewingArea);

    return () => {
      currTownController.removeListener('conversationAreasChanged', changeConversationArea);
      currTownController.removeListener('viewingAreasChanged', changeViewingArea);
    };
  }, [currTownController]);

  return (
    <ul>
      {allConversationAreas.map(eachConversationArea => (
        <li
          onClick={() => currTownController.emitConversationAreaRemoved(eachConversationArea)}
          key={eachConversationArea.id}>
          {eachConversationArea.id}
        </li>
      ))}
      {allViewingAreas.map(eachViewingArea => (
        <li
          onClick={() => currTownController.emitViewingAreaRemoved(eachViewingArea)}
          key={eachViewingArea.id}>
          {eachViewingArea.id}
        </li>
      ))}
    </ul>
  );
}
