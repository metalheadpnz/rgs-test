import React, {useState} from 'react';
import {FilterSelector} from "../FilterSeceltor/FilterSelector";
import Button from "@mui/material/Button";
import s from './Filterrs.module.scss'
import {InputAdornment, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import {FilterItem} from "./FilterItem";

import GitHubLabel from "./MyComponent";


const delMe = []
for (let i = 0; i < 15; i++) {
    delMe[i] = `Тест${i + 1}`
}


const filters = {
    ['Дата рождения']: ['Дата рождения'],
    ['Договоры']: ['договоры1', 'договоры2', 'договоры3', 'договоры4'],
    ['Задачи']: ['Открытые', 'Просроченные', 'Завершенные'],
    ['Убытки']: ['Убытки1', 'Убытки2', 'Убытки3', 'Убытки4', 'Убытки5'],
    ['Премия']: ['Премия1', 'Премия2', 'Премия3',],
    ['test2']: delMe
}
const getValue = (val: any) => {
    console.log(val)
}

export const FiltersComponent = () => {
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
        <div className={s.wrap}>

            <div className={s.controls}>
                <TextField sx={{"& fieldset": {border: 'none'}, backgroundColor: '#f2f2f5', borderRadius: '4px'}}
                           InputProps={{
                               endAdornment: (<InputAdornment position="end"><SearchIcon/></InputAdornment>),
                           }}
                           inputProps={
                               {style: {padding: '10px 14px'}}
                           }
                           placeholder={'ФИО страхователя'}/>

                <div className={s.icons}>
                    <SettingsIcon/>
                    <LoginIcon/>
                </div>

                <div className={s.controlButtons}>
                    <FilterSelector
                        variant={'withIcon'}
                        setFilter={activeFilterHandler}
                        activeFilters={activeFilters}
                        options={Object.keys(filters)}/>
                    <Button
                        variant='contained'
                        children={'Добавить клиента'}
                        endIcon={<AddIcon/>}
                    />
                </div>
            </div>

            <div className={s.activeFilters}>
                {activeFilters.map(filter =>
                    // <FilterItem
                    //     key={filter}
                    //     title={filter}
                    //     onChange={onFilterChange}
                    //     removeSelf={removeCurrentFilter}
                    //     options={filters[filter]}/>

                    <GitHubLabel
                        key={filter}
                        getValue={getValue}
                        title={filter}
                        options={filters[filter]}
                        removeSelf={removeCurrentFilter}
                    />
                )}

                {Boolean(activeFilters.length) &&
                    <>
                        <FilterSelector
                            variant={'withOutIcon'}
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
