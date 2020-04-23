import express from 'express';

const useRootpath = Object.freeze({
    paths: {
        api: '/api',
        static: '/static',
        public: '/public',
        documents: '/documents',
        builds: '/builds'
    },
    useApi: function (expressAppModuleReference) {
        const { state } = expressAppModuleReference;
        state.app.use(this.paths.api, (req, res, next) => {
            state.router(req, res, next);
        });
    },
    useStatic: function (expressAppModuleReference) {
        const { state } = expressAppModuleReference;
        return (pathToStatic) =>
            state.app.get(this.paths.static, express.static(pathToStatic));
    },
    usePublic: function (expressAppModuleReference) {
        const { state } = expressAppModuleReference;
        return (pathToPublic) =>
            state.app.get(this.paths.public, express.static(pathToPublic));
    },
    useDocuments: function (expressAppModuleReference) {
        const { state } = expressAppModuleReference;
        return (pathToDocuments) =>
            state.app.get(
                this.paths.documents,
                express.static(pathToDocuments)
            );
    },
    useBuilds: function (expressAppModuleReference) {
        const { state } = expressAppModuleReference;
        return (pathToDocuments) =>
            state.app.get(this.paths.builds, express.static(pathToDocuments));
    }
});

export default useRootpath;
export const rootPaths = useRootpath.paths;
