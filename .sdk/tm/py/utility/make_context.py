# ShodanEntitydb SDK utility: make_context

from core.context import ShodanEntitydbContext


def make_context_util(ctxmap, basectx):
    return ShodanEntitydbContext(ctxmap, basectx)
