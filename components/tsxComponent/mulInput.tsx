import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'MulTsxInput',
  props: {
    name: String,
    age: String,
    gender: String,
  },
  emits: ['update:name', 'update:age', 'update:gender'],
  setup(props, { emit }) {
    const nameRef = ref(props.name)
    const ageRef = ref(props.age)
    const genderRef = ref(props.gender)
    const onNameChange = (el) => {
      emit('update:name', el.target.value)
    }
    const onAgeChange = (el) => {
      emit('update:age', el.target.value)
    }
    const onGenderChange = (el) => {
      emit('update:gender', el.target.value)
    }
    return () => (
      <div>
        <input v-model={nameRef.value} onInput={onNameChange} />
        <input v-model={ageRef.value} onInput={onAgeChange} />
        <input v-model={genderRef.value} onInput={onGenderChange} />
      </div>
    )
  }
})