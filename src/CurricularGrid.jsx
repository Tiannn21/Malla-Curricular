import { useState } from 'react';
import { subjects } from './mocks/subjects.json';

function TableBody() {
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const headers = ['1° Semestre', '2° Semestre', '3° Semestre', '4° Semestre', '5° Semestre', '6° Semestre', '7° Semestre', '8° Semestre', '9° Semestre', '10° Semestre', '11° Semestre'];
    const maxColumns = 7;

    const filterSubjects = (index) => {
        return subjects.filter((subject) => subject.semester - 1 === index);
    };

    const handleClickTd = (subject) => {
        setSelectedSubjects((prevSelected) =>
            prevSelected.includes(subject) ? [] : [subject]
        );
    };

    const paintPreviatures = (subject) => {
        return selectedSubjects.some((prevSubject) => prevSubject.prev.includes(subject.name));
    };

    const paintNextures = (subject) => {
        return selectedSubjects.some((nextSubject) => nextSubject.next.includes(subject.name));
    };

    return (
        headers.map((header, index) => {
            const semesterSubjects = filterSubjects(index);
            const emptyCells = maxColumns - semesterSubjects.length;

            return (
                <tr key={header}>
                    <th>{header}</th>
                    {semesterSubjects.map((subject) => (
                        <td
                            key={subject.name}
                            onClick={() => handleClickTd(subject)}
                            style={{
                                backgroundColor: selectedSubjects.includes(subject)
                                    ? '#00c0ff'
                                    : paintPreviatures(subject) ? 'orange'
                                    : paintNextures(subject) ? '#64ff64'
                                    : 'transparent'
                            }}
                        >
                            {subject.name}
                        </td>
                    ))}
                    {Array.from({ length: emptyCells }).map((_, id) => (
                        <td key={`00-${index}-${id}`} style={{ backgroundColor: 'transparent' }} />
                    ))}
                </tr>
            );
        })
    );
}


export function CurricularGrid() {

    return (
        <div className="divTable">
            <table>
                <tbody>
                    <TableBody></TableBody>
                </tbody>
            </table>
        </div>

    )
}