import { useArray, useMount } from "utils";
import { useState, useEffect } from 'react';

export const TsReactTest = () => {
    const persons: { name: string; age: number}[] = [{name: "jack", age: 25}, {name: "tom", age: 30}]
    // const [person, setPerson] = useState<{ name: string; age: number}[] | []>(persons);
    const {value, clear, removeIndex, add} = useArray(persons);
    useMount(() => {
       
    })

    return (
        <div>
            <button onClick={() => add({name: 'joihn', age: 22})}>add jpojh</button>
            <button onClick={() => removeIndex(0)}>removeIndex</button>
            <button onClick={() => clear()}>clear all</button>
            {
                value?.map((person, index) => (
                    <div style={{marginBottom: '30px'}}>
                        <span style={{color: 'red'}}>
                              {index}
                        </span>
                        <span style={{color: 'black'}}>
                              {person.name}
                        </span>
                        <span style={{color: 'black'}}>
                              {person.age}
                        </span>
                    </div>
                ))
            }
        </div>
    )
}