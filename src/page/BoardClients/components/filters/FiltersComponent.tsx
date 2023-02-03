import React, {useState} from 'react';
import {AddFilter} from "../addFilter/AddFilter";
import Button from "@mui/material/Button";
import s from './Filterrs.module.scss'
import {TextField} from "@mui/material";
import {FilterItem} from "./FilterItem";

const filters = {
    ['Дата рождения']: ['Дата рождения'],
    ['Договоры']: ['договоры1', 'договоры2', 'договоры3', 'договоры4'],
    ['Задачи']: ['Открытые', 'Просроченные', 'Завершенные'],
    ['Убытки']: ['Убытки1', 'Убытки2', 'Убытки3', 'Убытки4', 'Убытки5'],
    ['Премия']: ['Премия1', 'Премия2', 'Премия3',],
    ['test']: new Array(8).fill('test')
}

export const FiltersComponent = () => {
    //const [activeFilters, setActiveFilters] = useState<Array<string>>([])
    const [activeFilters, setActiveFilters] = useState([])

    const activeFilterHandler = (option: string) => {
        //@ts-ignore
        setActiveFilters(perv => [...perv, option])
    }

    const onFilterChange = (checkedOptions: string[], filterName: string) => {
        console.log(`${filterName} = `, checkedOptions)
    }

    const removeCurrentFilter = (filterName: string) => {
        setActiveFilters(prevState => prevState.filter(f => f !== filterName))
    }


    return (
        <div>
            <div className={s.controls}>
                {/*<div className={s.searchBlock}>*/}
                {/*    <Input/>*/}
                {/*</div>*/}
                <TextField
                    placeholder={'ФИО страхователя'}/>
                <div className={s.controlButtons}>
                    <AddFilter
                        setFilter={activeFilterHandler}
                        activeFilters={activeFilters}
                        options={Object.keys(filters)}/>
                    <Button
                        variant='contained'
                    >
                        Добавить клиента
                    </Button>
                </div>

            </div>
            <div className={s.activeFilters}>
                {activeFilters.map(filter => {

                        return <FilterItem
                            key={filter}
                            title={filter}
                            onChange={onFilterChange}
                            removeSelf={removeCurrentFilter}
                            options={filters[filter]}/>
                    }
                )}

                {Boolean(activeFilters.length) &&
                    <>

                        <AddFilter
                            setFilter={activeFilterHandler}
                            activeFilters={activeFilters}
                            options={Object.keys(filters)}/>
                        <Button
                            children={"Сбросить все"}
                            className={s.resetButton}
                            onClick={() => setActiveFilters([])}/>
                    </>
                }
            </div>


        </div>
    )
}
