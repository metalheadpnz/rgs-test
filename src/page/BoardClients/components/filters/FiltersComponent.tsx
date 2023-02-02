import React, {useState} from 'react';
import {AddFilter} from "../addFilter/AddFilter";
import Button from "@mui/material/Button";
import s from './Filterrs.module.scss'
import {Input} from "@mui/material";
import {FilterItem, OptionType} from "./FilterItem";

const optionsList: Array<string> = [
    'Дата рождения',
    'Договоры',
    'Задачи',
    'Убытки',
    'Премия'
]

// const options = [
//     {name: 'Дата рождения', id: 1, checked: false},
//     {name: 'Договоры', id: 2, checked: false},
//     {name: 'Задачи', id: 3, checked: false},
//     {name: 'Убытки', id: 4, checked: false},
//     {name: 'Премия', id: 5, checked: false},
// ]


export const FiltersComponent = () => {
    const [activeFilters, setActiveFilters] = useState<Array<string>>([])

    const activeFilterHandler = (option: string) => {
        setActiveFilters(perv => [...perv, option])
    }

    const removeFilterHandler = (filterName: string) => {
        const filters = activeFilters.filter(f => f !== filterName)
        setActiveFilters(filters)
    }

    const [options, setOptions] = useState<Array<OptionType>>(() =>
        optionsList.map((option, id) => ({name: option, id, checked: false}))
    )

    return (
        <div>
            <div className={s.controls}>
                <div className={s.searchBlock}>
                    <Input/>
                </div>

                <div className={s.controlButtons}>
                    <AddFilter
                        setFilter={activeFilterHandler}
                        activeFilters={activeFilters}
                        options={optionsList}/>
                    <Button
                        variant='contained'
                    >
                        Добавить клиента
                    </Button>
                </div>

            </div>
            <div className={s.activeFilters}>
                {/*{activeFilters.map(filter => <Button key={filter}>{filter}</Button>)}*/}
                {activeFilters.map(filter =>
                    <FilterItem
                        key={filter}
                        removeSelf={removeFilterHandler}
                        options={options}
                        setOptions={setOptions}
                        title={filter}
                    />)}

                {Boolean(activeFilters.length) &&
                    <>
                        <AddFilter
                            setFilter={activeFilterHandler}
                            activeFilters={activeFilters}
                            options={optionsList}/>
                        <Button
                            children={"Сбросить все"}
                            className={s.resetButton}
                            onClick={() => setActiveFilters([])}/>
                    </>
                }

                {/*<FilterItem*/}
                {/*    removeSelf={removeFilterHandler}*/}
                {/*    options={options}*/}
                {/*    setOptions={setOptions}*/}
                {/*    title='Задачи'*/}
                {/*/>*/}

            </div>


        </div>
    )
}
