module Graphics exposing (roundRect)

import Html exposing (Html)
import Svg exposing (..)
import Svg.Attributes exposing (..)



-- VIEW


roundRect : Html.Html msg
roundRect =
    svg
        [ preserveAspectRatio "xMinYMin meet", width "20", height "20", viewBox "0 0 50 50" ]
        [ circle [ cx "25", cy "25", r "23", fill "white", stroke "black", strokeWidth "3" ] []
        , text_ [ dx "0.35em", dy "1em", fontSize "40" ] [ Html.text "1" ]
        ]
