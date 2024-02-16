import styles from './Select.module.scss'

type SelectProps<T = string> = {
    values: {
        value: T,
        name: string
    }[],
    onChange: (value: T) => void,
    value?: T
}

const Select = (props: SelectProps) => {

    return (
        <div className={styles.dropdown}>
            <img src={'/dropdown-icon.svg'} alt='стрелка на право (фильтры категории)' width={20} height={20} />
            <select value={props.value} title='filter' onChange={(e) => {
                props.onChange(e.target.value)
            }} defaultValue={props.values[0].value} className={styles.categoryFilter}>
                {
                    props.values.map((el) =>
                        <option key={el.value} value={el.value}>{el.name}</option>
                    )
                }
            </select>
        </div>
    )
}

export default Select