

module.exports = {

    // random key secret
    secretKey: 'CLEF_SECRETE',

    // token TLL
    tokenTTL: '24h',

    // nombre d'essaie mot de passe
    mistakesNumber: 3,

    // temps d'attente avant nouvelle connexion (en milliseconde)
    loginWait: 60000,

    // REGEX de connexion
    REGEX: [
        {
            regex: /(?=.*[0-9])/,
            error: 'le mot de passe doit contenir au moins 1 chiffre'
        },

        {
            regex: /(?=.*[!@#$%^&*])/,
            error: 'le mot de passe doit contenir au moins 1 caractère spécial'
        },

        {
            regex: /.{8,}/,
            error: 'le mot de passe doit contenir au moins 8 caractères'
        }
    ],

    // Regex des entrées
    inputRegex: /(?=.*[0-9])/


}