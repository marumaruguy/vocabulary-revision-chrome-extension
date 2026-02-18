import { Table, ScrollArea, Pagination, Button, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import { getVocabulary, deleteWord, Vocabulary as VocabularyType } from '@repo/database';
import { useEffect, useState } from 'react';

function onAction() {
    // placeholder for future action
}

export function Vocabulary() {
    const { t } = useTranslation();
    const [vocabularies, setVocabularies] = useState<VocabularyType[]>([]);
    const [activePage, setPage] = useState(1);
    const itemsPerPage = 10;

    const refresh = () => getVocabulary().then(setVocabularies);

    useEffect(() => {
        refresh();
    }, []);

    const totalPages = Math.ceil(vocabularies.length / itemsPerPage);
    const paginatedVocabularies = vocabularies.slice(
        (activePage - 1) * itemsPerPage,
        activePage * itemsPerPage
    );

    const handleRemove = async (id: string) => {
        await deleteWord(id);
        refresh();
    };

    const rows = paginatedVocabularies.map((vocab) => (
        <Table.Tr key={vocab.id}>
            <Table.Td>{vocab.word}</Table.Td>
            <Table.Td>
                <a href={vocab.url} target="_blank" rel="noreferrer">
                    {t('app.to')}
                </a>
            </Table.Td>
            <Table.Td>
                <Button variant="light" size="xs" onClick={onAction}>
                    {t('app.vocabulary.table.action')}
                </Button>
            </Table.Td>
            <Table.Td>
                <ActionIcon
                    variant="subtle"
                    color="red"
                    aria-label={t('app.vocabulary.table.remove')}
                    onClick={() => handleRemove(vocab.id)}
                >
                    <IconTrash size={16} />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <ScrollArea h={350} offsetScrollbars>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>{t('app.vocabulary.table.word')}</Table.Th>
                            <Table.Th>{t('app.vocabulary.table.url')}</Table.Th>
                            <Table.Th>{t('app.vocabulary.table.action')}</Table.Th>
                            <Table.Th>{t('app.vocabulary.table.remove')}</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
            <Pagination total={totalPages} value={activePage} onChange={setPage} mt="sm" />
        </>
    );
}
