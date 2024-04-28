<script>
import { defineStore } from 'pinia'
import axios from 'axios';

export const surveyStore = defineStore('survey', {
    state: () => ({
        survey: false,
        api_key: '',
        customer: '',
        project_id: '',
        show_survey : true
    }),
    getters: {
        get_survey: (state) => state.survey,
        get_project_id: (state) => state.project_id,
        get_api_key: (state) => state.api_key,
        get_customer: (state) => state.customer
    },
    actions: {
        set_api_key(api_key) {
            this.api_key = api_key
        },
        set_project_id(project_id) {
            this.project_id = project_id
        },
        set_survey(survey) {
            this.survey = survey
        },
        set_customer(customer) {
            this.customer = customer
        },

        set_survey_to_customer() {
            if (this.survey.default) {
                const randomChance = Math.floor(Math.random() * 5); // Generates a number from 0 to 4
                if (randomChance === 0) { // Has a 1 in 5 chance to be true (20% probability)
                    return this.show_survey = true;
                }

                return this.show_survey = false;
            }

            return this.show_survey = true
        },

        async trigger_survey(survey_id) {
            const apiUrl = 'http://local.dawnvox.com:8000/api/survey/trigger';
            try {
                const response = await axios.post(apiUrl, 
                {
                    project_id: this.project_id,
                    survey_id : survey_id,
                },
                {
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.api_key}`
                    },
                }
                );

                if (response.status != 200) {
                    throw new Error('Network response was not ok.');
                }
                else {
                    if (response.data) {
                        this.survey = response.data
                        this.show_survey = true
                    }
                }

            } catch (error) {

            }
        }
    }
})
</script>