import { withParams, ref } from "vuelidate/lib/validators/common";

export default (start, comparator) =>
    withParams({ type: "sameAs", after: start }, function(value, parentVm) {
        return comparator(ref(start, this, parentVm), value);
    });
