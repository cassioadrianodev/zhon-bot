module.exports = class Controller {
    constructor(options = {}, client) {

        this.name = options.name
        this.subcontrollers = options.subcontrollers || []

        this.client = client
    }

    canLoad() {
        return true
    }

    build() {
        this.subcontrollers.forEach(subcontroller => {
            Object.defineProperty(this, subcontroller.name, { get: () => subcontroller })
        })

        return this
    }
}