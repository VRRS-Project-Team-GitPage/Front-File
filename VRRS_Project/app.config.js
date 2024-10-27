// app.config.js
export default ({ config }) => ({
  ...config,
  extra: {
    eas: {
      projectId: "30281ff7-2311-47f8-9c37-ce90224beb42", // EAS Project ID 추가
    },
    submitEndpoint: process.env.submitEndpoint || "/review/submit",
  },
});
