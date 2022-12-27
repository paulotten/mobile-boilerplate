/**
 * @generated SignedSource<<5aff35dc92a5d1583dad6ba924eb82f8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type HomeQuery$variables = {};
export type HomeQuery$data = {
  readonly photosList: ReadonlyArray<{
    readonly photoId: string;
    readonly createdAt: string;
  }>;
};
export type HomeQuery = {
  variables: HomeQuery$variables;
  response: HomeQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "PhotoSummary",
    "kind": "LinkedField",
    "name": "photosList",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "photoId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdAt",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "acd281bd2a0a0d50af2d55dfcdde3fec",
    "id": null,
    "metadata": {},
    "name": "HomeQuery",
    "operationKind": "query",
    "text": "query HomeQuery {\n  photosList {\n    photoId\n    createdAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "f23df343d28b9768d86d2a9d4aa261ba";

export default node;
