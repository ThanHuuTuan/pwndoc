import Vue from 'vue'

export default {
  audit: {},

  getAudits: function(filters) {
    var queryParams = "?";
    if (filters)
      if (filters.findingTitle)
        queryParams += `findingTitle=${filters.findingTitle}`;
    return Vue.prototype.$axios.get(`audits${queryParams}`)
  },

  getAudit: function(auditId) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get(`audits/${auditId}`)
      .then(response => {
        this.audit.locale = response.data.datas.language;
        this.audit.name = response.data.datas.name;
        resolve(response);
      })
      .catch(error => {
        reject(error);
      })
    })
  },

  createAudit: function(audit) {
    return Vue.prototype.$axios.post('audits', audit)
  },

  deleteAudit: function(auditId) {
    return Vue.prototype.$axios.delete(`audits/${auditId}`)
  },

  getAuditGeneral: function(auditId) {
    return Vue.prototype.$axios.get(`audits/${auditId}/general`)
  },

  updateAuditGeneral: function(auditId, audit) {
    return Vue.prototype.$axios.put(`audits/${auditId}/general`, audit)
  },

  getAuditNetwork: function(auditId) {
    return Vue.prototype.$axios.get(`audits/${auditId}/network`)
  },

  updateAuditNetwork: function(auditId, audit) {
    return Vue.prototype.$axios.put(`audits/${auditId}/network`, audit)
  },

  createFinding: function(auditId, finding) {
    return Vue.prototype.$axios.post(`audits/${auditId}/findings`, finding)
  },

  getFindings: function(auditId) {
    return Vue.prototype.$axios.get(`audits/${auditId}/findings`)
  },
  
  getFinding: function(auditId, findingId) {
    return Vue.prototype.$axios.get(`audits/${auditId}/findings/${findingId}`)
  },

  updateFinding: function(auditId, findingId, finding) {
    return Vue.prototype.$axios.put(`audits/${auditId}/findings/${findingId}`, finding)
  },

  deleteFinding: function(auditId, findingId) {
    return Vue.prototype.$axios.delete(`audits/${auditId}/findings/${findingId}`)
  },

  getAuditSummary: function(auditId) {
    return Vue.prototype.$axios.get(`audits/${auditId}/summary`)
  },

  updateAuditSummary: function(auditId, audit) {
    return Vue.prototype.$axios.put(`audits/${auditId}/summary`, audit)
  },

  createSection: function(auditId, section) {
    return Vue.prototype.$axios.post(`audits/${auditId}/sections`, section)
  },

  getSection: function(auditId, sectionId) {
    return Vue.prototype.$axios.get(`audits/${auditId}/sections/${sectionId}`)
  },

  updateSection: function(auditId, sectionId, section) {
    return Vue.prototype.$axios.put(`audits/${auditId}/sections/${sectionId}`, section)
  },

  deleteSection: function(auditId, sectionId) {
    return Vue.prototype.$axios.delete(`audits/${auditId}/sections/${sectionId}`)
  },

  getAuditTypes: function() {
    return Vue.prototype.$axios.get(`audits/types`)
  },

  generateAuditReport: function(auditId) {
    Vue.prototype.$axios.get(`audits/${auditId}/generate`, {responseType: 'blob'})
    .then(response => {
      var blob = new Blob([response.data], {type: "application/octet-stream"});
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = response.headers['content-disposition'].split('"')[1];
      link.click();
    })
    // window.open(`${window.location.protocol}//${window.location.hostname}:${process.env.API_PORT}/api/audits/${auditId}/generate`)
  }
}