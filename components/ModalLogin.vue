<template>
  <div id="app">
    <v-dialog v-model="dialog" max-width="700px">

      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          ログイン
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="headline">ログイン</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <v-text-field v-model="inputMail" label="メールアドレス" type="email" hint="" outlined dense></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  v-model="inputPassword"
                  label="パスワード"
                  hint="At least 6 characters"
                  @click:append="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text :loading="isLoad" @click="login">
            Save
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import firebase from '@/plugins/firebase';

  export default {
    components: {
    },
    data() {
      return {
        inputMail: '',
        inputPassword: '',
        dialog: false,
        showPassword: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
        },
        isLoad: false,
      }
    },
    methods: {
      login() {
        console.log("login start")
        this.isLoad = true;
        firebase.auth().signInWithEmailAndPassword(this.inputMail, this.inputPassword).then(
          user => {
            console.log("login success");
            console.log(user)
            this.isLoad = false;
            this.dialog = false;
          },
          err => {
            console.log('[signIn] mailSignIn error!');
            this.isLoad = false;
          }
        )
      }
    },
  }
</script>
