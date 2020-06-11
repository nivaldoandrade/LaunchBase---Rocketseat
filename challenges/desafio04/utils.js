module.exports = {
    age: (timestamp) => {
        const today = new Date();
        const dateBirth = new Date(timestamp);

        let age = today.getFullYear() - dateBirth.getFullYear();
        const month = today.getMonth() - dateBirth.getMonth();

        if (month < 0 || month == 0 && today.getDate() < dateBirth.getUTCDate()){
            return --age;
        }
        return age;
    },
    date: (timestamp) => {
        const created_at = new Date(timestamp);
        
        const year = created_at.getUTCFullYear();
        const month = `0${created_at.getUTCMonth() + 1}`.slice(-2);
        const day = `0${created_at.getUTCDate()}`.slice(-2);

        return {
            day: `${day}`,
            month: `${month}`,
            year: `${year}`,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        };
    },
    servicesSplit: (services) => {
        const servicesSplit = services.split(",");
        let servicesOk = [];

        servicesSplit.map((service) => {
            if (service.trim() != '') {
                servicesOk.push(service.trim());
            }
        });

        servicesOk = servicesOk + "";

        return servicesOk;
    },
    grade: (schoolYear) => {
        const grade = schoolYear;
        let gradeReturn = `${grade.charAt(0)}ª`;

        if (grade.slice(-2) == "EF") {
            gradeReturn = gradeReturn + " Ano do Ensino Fundamental";
        } else if (grade.slice(-2) == "EM") {
            gradeReturn = gradeReturn + " Ano do Ensino Médio";
        }

        return gradeReturn;
    }
};
