import { addVocabulary } from '@repo/database';
import { v4 as uuidv4 } from 'uuid';

export const createMenu = (title: string) => {
    chrome.contextMenus.create({
        type: 'normal',
        contexts: ['selection'],
        title: title,
        id: 'vocabulary-revision-lite'
    });
};

export const addMenuEventListeners = () => {
    chrome.contextMenus.onClicked.addListener(
        async (info) => {
            if (info.menuItemId !== 'vocabulary-revision-lite') {
                return;
            }
            const text = info.selectionText;

            // const config = await getConfig();

            const url = await new Promise<string>(resolve => chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => resolve(tabs[0] ? (tabs[0].url || '') : '')));

            if (text) {
                await addVocabulary({
                    id: uuidv4(),
                    word: text,
                    url: url,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }

            chrome.tabs.create(
                {
                    url: `https://www.perplexity.ai/search/new?q=${encodeURIComponent(text || '')}`
                },
                () => {

                }
            );
        }
    );
};