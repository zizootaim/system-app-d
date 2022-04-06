<template>
    <div class="shift__form-wrapper">
        <form>
            <h1 class="form__title">
                Edit Shift
            </h1>
            <div class="form__control">
                <input type="text" placeholder="Week">
            </div>
            <div class="form__control">
                <input type="text" placeholder="Day">
            </div>
            <div class="form__control">
                <input type="text" placeholder="Employee">
            </div>
            <div class="form__control">
                <select>
                    <option disabled hidden>Shift</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="off">Off</option>
                    <option value="on-call">On Call</option>
                </select>
            </div>
                 <div class="submit__btn-wrapper">
                <button class="submit-btn">
                Submit
            </button>
         </div>
        </form>
    </div>
</template>
<script>
export default {
    name:'editShiftForm'
}
</script>
<style>

</style>