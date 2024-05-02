<script>
import { defineStore } from 'pinia'
import axios from 'axios';

export const surveyStore = defineStore('survey', {
    state: () => ({
        survey: false,
        api_key: null,
        user_id: null,
        dawnvox_user_id: null,
        project_id: null,
        show_survey : false,
        show_notification : false
    }),
    getters: {
        get_survey: (state) => state.survey,
        get_show_survey: (state) => state.show_survey,
        get_project_id: (state) => state.project_id,
        get_api_key: (state) => state.api_key,
        get_user: (state) => state.user_id,
        get_dawnvox_user: (state) => state.dawnvox_user_id
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
        set_user_id(user_id) {
            this.user_id = user_id
        },
        async update_user(user_id, data) {
            try {
                this.user_id = user_id
                const apiUrl = 'http://local.dawnvox.com:8000/api/user-update';
                const response = await axios.post(apiUrl, 
                {
                    project_id: this.project_id,
                    name: data.name,
                    email: data.email, 
                    user_id : this.user_id,
                    dawnvox_user_id: this.dawnvox_user_id
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
                    return true
                }
            } catch (error) {
                console.log(error)
            }
            
        },
        set_dawnvox_user_id(dawnvox_user_id) {
            this.dawnvox_user_id = dawnvox_user_id
        },
        toggle_show_survey() {
            this.show_survey = !this.show_survey
        },
        show_or_not() {
            if (this.survey.default) {
                const randomChance = Math.floor(Math.random() * 5); // Generates a number from 0 to 4
                if (randomChance === 0) { 
                    this.show_survey = true // Has a 1 in 5 chance to be true (20% probability)
                    return true;
                }
                this.show_survey = false
                return false;
            }

            this.show_survey = true
            return true;
        },
        async set_event(event_name) {
            const apiUrl = 'http://local.dawnvox.com:8000/api/events';
            try {
                const response = await axios.post(apiUrl, 
                {
                    project_id: this.project_id,
                    name : event_name,
                    user_id : this.user_id,
                    dawnvox_user_id: this.dawnvox_user_id
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.api_key}`
                    }
                }
                );

                if (response.status != 200) {
                    throw new Error('Network response was not ok.');
                }
                else {
                    this.survey = response.data
                    this.show_survey = true
                }
            } catch (error) {
                console.error("Failed to connect to Dawnvox:", error);
            }

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