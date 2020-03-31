<template>
    <ValidationProvider
            :vid="vid"
            :name="$attrs.name"
            :rules="rules"
            v-slot="{ valid, errors }"
            slim
    >
        <b-form-group v-bind="$attrs">
            <template v-slot:label>
                <slot name="label"></slot>
            </template>
            <b-form-input
                    v-model="innerValue"
                    v-bind="$attrs"
                    :state="errors.length ? false : (valid ? true : null)"
            ></b-form-input>
            <b-form-invalid-feedback id="inputLiveFeedback">
                <span v-for="(error, index) in errors" :key="index">
                    {{error}}<br>
                </span>
            </b-form-invalid-feedback>
        </b-form-group>
    </ValidationProvider>
</template>

<script>
    import {ValidationProvider} from "vee-validate";
    import {BFormGroup, BFormInput, BFormInvalidFeedback} from 'bootstrap-vue';

    export default {
        components: {
            ValidationProvider,
            BFormGroup,
            BFormInput,
            BFormInvalidFeedback
        },
        props: {
            vid: {
                type: String
            },
            rules: {
                type: [Object, String],
                default: ""
            },
            // must be included in props
            value: {
                type: null
            }
        },
        data: () => ({
            innerValue: ""
        }),
        watch: {
            // Handles internal model changes.
            innerValue(newVal) {
                this.$emit("input", newVal);
            },
            // Handles external model changes.
            value(newVal) {
                this.innerValue = newVal;
            }
        },
        created() {
            if (this.value) {
                this.innerValue = this.value;
            }
        },
    };
</script>
